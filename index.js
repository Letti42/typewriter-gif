const fs = require('fs');
const { createCanvas } = require('canvas');
const GIFEncoder = require('gifencoder');

//1920x500
//10 fps
//Create GIF
const encoder = new GIFEncoder(1920, 500);
encoder.createReadStream().pipe(fs.createWriteStream('./output.gif'));
encoder.setRepeat(0);
encoder.setDelay(100);
encoder.setQuality(10);
encoder.start();

async function createImage(text, output, cursor) {
    return new Promise((resolve) => {
        //Create canvas
        //ugly canvas code 🤢
        const width = 1920
        const height = 500
        const canvas = createCanvas(width, height)
        const context = canvas.getContext('2d')

        //Fill backgrounds
        context.fillStyle = "#141321";
        context.rect(0, 0, canvas.width, canvas.height);
        context.fill();

        //Writes multiple texts with colour
        let textAlign = 75;
        let imgText;
        for (let i = 0; i < text.length; i++) {
            context.font = 'bold 120pt Sans Bold'
            context.textBaseline = 'top'
            context.fillStyle = '#ffffff'
            imgText = text[i].text;
            context.fillStyle = text[i].color
            context.fillText(imgText, textAlign, 145)
            textAlign += context.measureText(imgText).width
            console.log(imgText, text[i].color);
        }

        //create the caret
        context.font = 'bold 50pt Sans'
        imgText = 'l';
        textAlign += 10;
        if (cursor) {
            context.fillText(imgText, textAlign, 125);
            context.fillText(imgText, textAlign, 175);
            context.fillText(imgText, textAlign, 225);
            context.fillText(imgText, textAlign, 275);
        }


        //Output
        encoder.addFrame(context);
        if (output.includes("173")) encoder.finish();
        //const imgBuffer = canvas.toBuffer('image/png')
        //fs.writeFileSync('./frames/' + output, imgBuffer)
        resolve();

    });

}

//Write on the gif
let startText = "Total Projects: ";

//will be changed in the future as I create even more :)
let totalProjects = 276;

; (async () => {
    for (let i = 0; i < 174; i++) {
        //Encoding the frames
        let filename = `frame${"0".repeat(3 - i.toString().length)}${i}.png`;
        if (i < 17) createImage([{ text: startText.substring(0, i), color: "#a9fef7" }], filename, true)
        if (i >= 17 && i < 51) createImage([{ text: startText, color: "#a9fef7" }], filename, ((i + 1) % 10 > 4))
        if (i >= 51 && i < 67) createImage([{ text: startText, color: "#a9fef7" }, { text: '', color: "#d83b7d" }], filename, ((i + 1) % 10 > 4))
        if (i >= 67 && i < 73) createImage([{ text: startText, color: "#a9fef7" }, { text: totalProjects.toString().substring(0, Math.ceil((i - 66) / 2)), color: "#d83b7d" }], filename, true)
        if (i >= 73 && i < 125) createImage([{ text: startText, color: "#a9fef7" }, { text: totalProjects.toString(), color: "#d83b7d" }], filename, ((i + 2) % 10 > 4))
        if (i >= 125 && i < 133) createImage([{ text: startText, color: "#a9fef7" }, { text: totalProjects.toString().substring(0, Math.ceil((6 - (i - 125)) / 2)), color: "#d83b7d" }], filename, ((i + 2) % 10 > 4))
        if (i >= 133 && i < 163) createImage([{ text: startText.substring(0, Math.ceil((30 - (i - 133)) / 2)), color: "#a9fef7" }], filename, ((i + 2) % 10 > 4))
        if (i >= 163) createImage([{ text: "", color: "#a9fef7" }], filename, ((i + 3) % 10 > 4))
    }
})();
