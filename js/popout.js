const PopButton = document.getElementById('pip-btn');
const ToolContainer = document.getElementById('tool-container');
const Placeholder = document.getElementById('tool-placeholder');

let Popped = false;

PopButton.addEventListener('click', async () => {
    if (Popped === true) {return}

    // Check if the browser actually supports Document PiP
    if (!('documentPictureInPicture' in window)) {

        return;
    }

    Popped = true;

    const Window = await window.documentPictureInPicture.requestWindow({
        width: 500,
        height: 300,
    });

    const Styles = [...document.head.querySelectorAll('style, link[rel="stylesheet"]')];
    Styles.forEach((Style) => {
        Window.document.head.appendChild(Style.cloneNode(true));
    });

    ToolContainer.replaceWith(Placeholder);

    Window.document.body.appendChild(ToolContainer);

    Window.addEventListener('pagehide', () => {
        // Put the tool back in its original spot on the main page
        Placeholder.replaceWith(ToolContainer);
        Popped = false;
    });
});