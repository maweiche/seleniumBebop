from selenium import webdriver
from selenium.webdriver.support.ui import Select
from requests_html import HTMLSession, AsyncHTMLSession
import time

# import config.env

'''
python supreme.py --name="North Face"
'''

base_url = 'https://www.supremenewyork.com'

# Get Links to all products
def get_product_links():
    '''
    Returns list of elements "items",
    each containing a link to product detail page
    '''
    base_shop = base_url + '/shop'
    session = HTMLSession()
    r = session.get(base_shop)
    items = r.html.find('#shop-scroller', first=True).find('li')
    return items, session

# Check for matched product
def get_matched_and_available(target_name):
    '''
    Given a target name, filter the product on main page,
    and return links to products with available items

    checked_urls: if already checked (and not a match in product name),
    skip in future checks

    Exactly how this should work, depends on how the drop works - is the page already there,
    just not for sale yet? Or page is added at drop time?
    '''

    target_name_list = [x.lower() for x in target_name.split(' ')]
    potential_urls = []
    items, session = get_product_links()
    for item in items:
        target_url = base_url + item.find('a', first=True).attrs['href']
        r = session.get(target_url)
        product_name = r.html.find('h2[itemprop=name]', first=True).text.lower()
        found = True
        for q in target_name_list:
            if q not in product_name:
                found = False
                break
            print('******************')
            if found:
                print(f'Found a match: {product_name}')
                # check if can buy
                if check_can_buy(r):
                    print('Still available.')
                    potential_urls.append(target_url)
                else: 
                    print('No longer available')

            else:
                print(f'Not a match: {product_name}')

        return potential_urls

        # Check if product is available
        def check_can_buy(r):
            '''
            Given a page (returned by session.get(target_url)),
            find if there is such html code within:
            <input type="submit" name="commit" value="add to cart" class="button">
            Returns True if so, False if not
            '''

            buy_btn = r.html.find('input[value="add to cart"]', first=True)
            return (buy_btn is not None)