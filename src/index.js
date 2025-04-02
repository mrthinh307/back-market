import React from 'react' // nạp thư viện react
import ReactDOM from 'react-dom' // nạp thư viện react-dom
import './assets/styles/base.css' // nạp file css base.css
import './assets/styles/fonts.css' // nạp file css fonts.css

// Tạo component App
function App() {
    return (
        <div>
            <h1>Back-market!</h1>
            <p>Refurbished tech that's better for the planet | Back Market</p>
        </div>
    )
}

// Render component App vào #root element
ReactDOM.render(<App />, document.getElementById('root'))

