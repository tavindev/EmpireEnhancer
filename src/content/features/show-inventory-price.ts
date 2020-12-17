import select from 'select-dom'

import calculatePrice from '../helpers/get-inventory-price'
import { isLoggedIn } from '../helpers/user'
import {
    hasFeatureAttribute,
    setFeatureAttribute,
} from '../helpers/dom-element'
import { isSteamDepositPage } from '../helpers/pages'

import inventoryPriceComponent from '../components/inventory-price'

const FEATURE_ATTRIBUTE = Math.random().toString(36).substr(2, 9)

export default async () => {
    if (isLoggedIn) {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((item, i) => {
                if (!item.target.className.includes('chat__messages')) {
                    let parent = select('.search')
                    if (isSteamDepositPage() && parent) {
                        if (!hasFeatureAttribute(FEATURE_ATTRIBUTE, parent)) {
                            setFeatureAttribute(FEATURE_ATTRIBUTE, parent)
                            ;(async () => {
                                parent.insertBefore(
                                    inventoryPriceComponent(
                                        await calculatePrice(),
                                    ),
                                    parent.children[1],
                                )

                                parent.style.display = 'flex'
                                parent.children[0].style.width = '18rem'
                                parent.style.maxWidth = '80rem'
                            })()
                        }
                    }
                }
            })
        })
        observer.observe(document.body, { childList: true, subtree: true })
    }
}
