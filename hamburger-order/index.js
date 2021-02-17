const { startInteraction, continueInteraction } = require("./chatbot");
const { displayPrompt, displayEnd } = require("./frontend");

let isEnding = false;

const resetConversationSession = async () => {
    await startInteraction();
    isEnding = false;
}

const stdin = process.openStdin();
stdin.addListener("data", async (data) => {
    const textInput = data.toString().trim();

    if (!isEnding) {
        isEnding = await continueInteraction(textInput);
        if (isEnding) displayPrompt(); 
        return 
    }

    if (textInput === 'y') {
        await resetConversationSession();
    } else {
        displayEnd();
        process.exit();
    }
});

(async () => {
    await resetConversationSession();
})();

