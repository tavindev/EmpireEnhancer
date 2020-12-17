import React from 'react'
import ReactDOM from 'react-dom'

import storage from '../shared/storage'

export default class App extends React.Component {
    state = {
        loggedin: false,
        manual_loggedin: false,
        username: '',
    }

    /**async componentDidMount() {
    return;
  }*/

    render() {
        return (
            <div>
                <div id="login">
                    <p id="login_status">Status: Not logged in</p>
                    <p className="centered" id="manual_login">
                        <b>Alternative method:</b> Enter username manually
                    </p>
                </div>
                <form id="settings">
                    <label
                        htmlFor="username"
                        id="username_label"
                        className="bold">
                        Discord user ID
                    </label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        placeholder="Discord Username Here"
                    />
                    <label htmlFor="webHookUrl" className="bold">
                        Webhook URL
                    </label>
                    <input
                        type="text"
                        id="webHookUrl"
                        name="webHookUrl"
                        placeholder="https://discordapp.com/api/webhooks/..."
                    />
                    <div id="webHookInfo"></div>
                </form>
                <button id="saveSettings" className="centered">
                    Save
                </button>
            </div>
        )
    }
}
