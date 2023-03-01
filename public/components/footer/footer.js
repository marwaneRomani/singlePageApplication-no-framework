const html = `
    <div>
        Footer
    </div>
`;

export function renderComponent({ loggedIn }) {
    let div = getHtml(html);

    return div;
}


function getHtml(html) {
    const div = document.createElement("div");
    
    div.innerHTML = html;

    return div;
}
