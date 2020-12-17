/** @jsx h */
import { h } from 'dom-chef'

export default ({ p, balance, total }) => {
    return (
        <div
            id="inv_price"
            className="flex relative justify-center items-center"
            style={{
                'font-size': '1.38rem',
                'font-weight': '400',
                color: 'silver',
                'margin-left': '1rem',
            }}>
            Inventory Price: ${p}
            <span style={{ color: '#10d960', 'margin-left': '.25rem' }}>
                (${(p * 1.16 + balance).toFixed(2)})
            </span>
            <span style={{ color: '#e9b10b', 'margin-left': '.25rem' }}>
                (${total})
            </span>
        </div>
    )
}
