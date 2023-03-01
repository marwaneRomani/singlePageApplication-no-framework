import { url } from "../config/index.js";
import { checkConnection } from "../utils/utils.js";
import { apptlicationState } from "../state/state.js";


// import components 
import { renderComponent as renderHeader } from "../components/header/header.js";
import { renderComponent as renderLogin } from "../components/login/login.js";
import { renderComponent as renderFooter } from "../components/footer/footer.js";
import { renderComponent as renderRegister } from "../components/register/register.js";
import { renderComponent as renderTodos } from "../components/todos/todos.js";


const pages = [
  { 
    path: '',
    protected: false,
    components: [renderHeader, renderLogin, renderFooter ]
  },
  { 
    path: "login",
    protected: false,
    components: [renderHeader, renderLogin, renderFooter ]
  },
  { 
    path: "register",
    protected: false,
    components: [renderHeader, renderRegister, renderFooter ]
  },
  { 
    path: "todos",
    protected: true,
    components: [renderHeader, renderTodos ,renderFooter ]
  },
  { 
    path: "logout",
    protected: false,
    components: [renderHeader, renderLogin ,renderFooter ]
  }
]

const root = document.getElementById("root");
console.log(window);
window
  .addEventListener("popstate", async (event) => {
      let data = await checkConnection();
      console.log("run heere")      
      apptlicationState.isLoggedIn = data.isLoggedIn;

      renderUi(window.location.href); 
      addListnerToUrlChanges();
  });

window
  .addEventListener("load", async (event) => {
      let data = await checkConnection();
      console.log("run heere")
      apptlicationState.isLoggedIn = data.isLoggedIn;

      renderUi(window.location.href);
      addListnerToUrlChanges();
  });



function addListnerToUrlChanges() { 
    const links = document.querySelectorAll("a");

    links.forEach(link => {
      link.addEventListener("click", event => { 
        event.preventDefault(); 
         
        renderUi(link.href);
      })
    });
}

async function renderUi(href) {
    root.innerHTML = "";

    console.log(apptlicationState)

    let url;

    if (href.indexOf("/client") != -1 )  url = (href).split("/")[4]
    else url = (href).split("/")[3]

    if (url == "logout") {
      apptlicationState.isLoggedIn = false;
      fetch(url)
    }
     

    let result = pages.filter(page => page.path == url);


    result[0].components.forEach(component => root.appendChild(component({ loggedIn: apptlicationState.isLoggedIn })));


    addListnerToUrlChanges();
}


export { 
  renderUi
}