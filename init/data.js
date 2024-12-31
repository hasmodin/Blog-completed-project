const Blog = require("../model/blogModel");
const mongoose = require("mongoose");
main()
.then((result) => {
    console.log("Connected to DB");
})
.catch((err) => {
    console.log("Error while connecting to DB");

})

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/blogDB');
}

let blogs = [
  {
    title: "AMD Is Making Great Strides in AI, May End Up Merging With Intel",
    content:
      "AMD has made significant strides in AI. Last week, it announced that its first 1-billion parameter large language models are performing exceptionally well. Under the leadership of CEO Lisa Su and with the help of CTO and Executive VP Mark Papermaster, AMD has done an admirable job of fast pivoting after Nvidia and OpenAI’s initial surprise success to create a credible generative AI solution.",
      author: "Hasmodin",
      image:{
        url:"https://www.technewsworld.com/wp-content/uploads/sites/3/2022/04/brain-on-chip-2.jpg",
        filename: "filename",
      },
      
  },
  {
    title: "Outdated Risk Management Frameworks Face Growing Criticism",
    content:
      "Risk management in many organizations is mired in a framework that can’t keep pace with the challenges that most enterprise risk teams face. It needs to be modernized. That’s the verdict that senior analysts Cody Scott and Alla Valente handed down in a recent Forrester Research blog that’s critical of the Three Lines of Defense (3LOD) approach, which is widely used to assess organizational risk.",
      author: "Hasmodin",
      image: {
        url:"https://www.technewsworld.com/wp-content/uploads/sites/3/2022/07/information-security-team.jpg",

        filename: "filename",
      },
  },

  {
    title: "What To Focus on at Microsoft Ignite This Year: Avoiding AI Catastrophes",
    content:
      "Microsoft Ignite is on this week. It’s the company’s massive event focused on IT professionals. While you can attend this event remotely, you should consider attending in person this year because I still see far more AI failures than successes. When AI is deployed successfully, it has a significant positive impact on productivity, yet quality appears to be going in the wrong direction. But not for everyone.Shows like Microsoft Ignite are full of information on products and services. The event is attended by many IT professionals in different industries, with varying levels of AI deployment and very different paths to success.",
      author: "Hasmodin",
      image: {
        url: "https://www.technewsworld.com/wp-content/uploads/sites/3/2024/11/Satya-Nadella-Microsoft-Ignite.jpg",
        filename: "filename",
      }
  },

]

const dataInit = async (blogs) => {
    try {
        let saveData = await Blog.insertMany(blogs);
    console.log("data inserted", saveData);
    } catch (err) {
        console.log("Error inserting data", err);
    }
}
dataInit();