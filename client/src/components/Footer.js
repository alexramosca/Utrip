export const Footer = ()=>{
    return (
    <>
    <div className="footer">
        <div className="upperFooter">
            <div className="logoWrapper">
            <img id="navLogo" src='./icons/logo.png' />
            </div>
            <div className="socialMediaWrapper">
                <img className="socialMedia" src="./icons/facebook.svg" />
                <img className="socialMedia" src="./icons/insta.svg" />
                <img  className="socialMedia" src="./icons/whatsapp.svg" />
            </div>
        </div>
        <div className="bottomFooter">
            <ul>
                <a><li>FAQ</li></a>
                <a><li>About us</li></a>
                <a><li>Contact us</li></a>
                <a><li>Support</li></a>
            </ul>
        </div>
    </div>
    </>
    )
}