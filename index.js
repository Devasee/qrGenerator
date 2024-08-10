import inquirer from "inquirer";
import qr from "qr-image";
import fs, { writeFile } from "fs";

inquirer
  .prompt([
    {
      message: "Type in your URL",
      name: "URL"
    }
  ])
  .then((answers) => {
    const url = answers.URL;
    
    // Generate QR code and save as a PNG file
    const qr_svg = qr.image(url, { type: 'png' });
    qr_svg.pipe(fs.createWriteStream("qr_img.png"));

    fs.writeFile("URL.txt", url, (err) => {
        if(err) throw err;
        console.log("the file has been saved")
    })
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.error("Prompt couldn't be rendered in the current environment");
    } else {
      console.error("Something went wrong:", error);
    }
  });
