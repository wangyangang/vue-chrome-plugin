from lxml import etree


def main():
    with open('test.html', 'r', encoding='utf-8') as f:
        tree = etree.HTML(f.read())
        tb = tree.xpath("//table")
        print(tb)


if __name__ == '__main__':
    main()