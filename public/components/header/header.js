import { checkConnection } from "../../utils/utils.js";

const html = `
            <Style>
            #header {
                overflow: hidden;
                background-color: #f1f1f1;
                padding: 20px 10px;
            }
            
            /* Style the header links */
            #header a {
                float: left;
                color: black;
                text-align: center;
                padding: 12px;
                text-decoration: none;
                font-size: 18px;
                line-height: 25px;
                border-radius: 4px;
            }
            
            /* Style the logo link (notice that we set the same value of line-height and font-size to prevent the header to increase when the font gets bigger */
            #header a.logo {
                font-size: 25px;
                font-weight: bold;
            }
            
            /* Change the background color on mouse-over */
            #header a:hover {
                background-color: #ddd;
                color: black;
            }
            
            /* Style the active/current link*/
            #header a.active {
                background-color: dodgerblue;
                color: white;
            }
            
            /* Float the link section to the right */
            #header-right {
                float: right;
            }
            
            /* Add media queries for responsiveness - when the screen is 500px wide or less, stack the links on top of each other */
            @media screen and (max-width: 500px) {
                #header a {
                float: none;
                display: block;
                text-align: left;
                }
                #header-right {
                float: none;
                }
            }
            </Style>

            <div id="header">
                <a href="#default" class="logo">Todo list</a>
                <div id="header-right">
                <a id="home" class="active" href="/">Home</a>
                <a id="login" href="/login">Login</a>
                <a id="register" href="/register">Register</a>
                <a id="logout" href="/logout">Logout</a>
                </div>
            </div>`;



export function renderComponent({ loggedIn }) {
    let div = getHtml(html);
    
    let res =  div.querySelector("#header");
    
    setElementsToRender(loggedIn, res);

    return div;
}



function setElementsToRender(loggedIn, header) {
    let login = header.querySelector("#login");
    let register = header.querySelector("#register");
    let logout = header.querySelector("#logout");


    if (loggedIn) {
        login.hidden = true;
        register.hidden = true;
        logout.hidden = false;
    }
    else {
        login.hidden = false;
        register.hidden = false;
        logout.hidden = true;
    }
}


function getHtml(html) {
    const div = document.createElement("div");
    
    div.innerHTML = html;

    return div;
}