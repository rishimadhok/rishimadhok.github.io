import os
from bs4 import BeautifulSoup
from html.parser import HTMLParser

HTML_FILE = os.path.join(os.path.dirname(os.path.dirname(__file__)), "index.html")

class IntegrityParser(HTMLParser):
    void_elements = {
        "area", "base", "br", "col", "embed", "hr", "img", "input", "link",
        "meta", "param", "source", "track", "wbr"
    }

    def __init__(self):
        super().__init__()
        self.stack = []
        self.duplicate_errors = []
        self.tag_errors = []

    def handle_starttag(self, tag, attrs):
        names = [name for name, _ in attrs]
        seen = set()
        for name in names:
            if name in seen:
                self.duplicate_errors.append(
                    f"Duplicate attribute '{name}' in <{tag}> tag"
                )
                break
            seen.add(name)
        if tag not in self.void_elements:
            self.stack.append(tag)

    def handle_endtag(self, tag):
        if not self.stack or self.stack[-1] != tag:
            self.tag_errors.append(f"Mismatched closing tag </{tag}>")
        else:
            self.stack.pop()

    def close(self):
        super().close()
        if self.stack:
            self.tag_errors.append(f"Unclosed tag <{self.stack[-1]}>")

def test_html_validity():
    with open(HTML_FILE, "r", encoding="utf-8") as f:
        html_content = f.read()

    # Parse with BeautifulSoup to ensure the HTML is well-formed enough for BS4
    soup = BeautifulSoup(html_content, "html.parser")
    assert soup is not None

    parser = IntegrityParser()
    parser.feed(html_content)
    parser.close()

    assert not parser.duplicate_errors, f"Duplicate attributes found: {parser.duplicate_errors}"
    assert not parser.tag_errors, f"Tag structure errors: {parser.tag_errors}"

