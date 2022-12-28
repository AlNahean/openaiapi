import { OpenAi } from "../../../lib/Openai/OpenAiConfig";

let myRes = {
  path: "generate image post",
  data: {
    created: 1671809853,
    data: [
      {
        url: "https://oaidalleapiprodscus.blob.core.windows.net/private/org-eEV6W2Prbm0AJdVJS89o9z0d/user-Uyn4FNNmYhj7FHkuj8XE0zi2/img-hkjpsH1K5e8mhIyVeGmOdsRr.png?st=2022-12-23T14%3A37%3A33Z&se=2022-12-23T16%3A37%3A33Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2022-12-23T11%3A28%3A23Z&ske=2022-12-24T11%3A28%3A23Z&sks=b&skv=2021-08-06&sig=1AT4YSzVeLE2wYXkJrcB8Uff9VxtgC3RYwa9/7nmGW8%3D",
      },
    ],
  },
};

const getSize = (size) => {
  console.log(size);
  if (size === "Large") {
    return "1024x1024";
  }
  if (size === "Medium") {
    return "512x512";
  }
  if (size === "Small") {
    return "256x256";
  }
  // return "256x256";
};

console.log(myRes.data.data[0].url);

export default async (req, res) => {
  try {
    if (req.method === "POST") {
      let { prompt, size } = req.body;

      // Generate The Image
      const response = await OpenAi.createImage({
        prompt: prompt,
        n: 1,
        size: getSize(size),
      });

      //   console.log("response", response);
      // console.log("image_url ->", response.data.data[0].url);
      res.status(200).json({
        text: "image generated",
        data: {
          // ...response.data,
          prompt,
          size,
          createdAt: Date.now(),
          url: response.data.data[0].url,
        },
      });
      //   res.status(200).json({ path: "generated image post", data: myRes });
    }
    if (req.method === "GET") {
      res.status(200).json({ path: "generate image" });
    }
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
    res.status(404).json({ prompt: "something went wrong" });
  }
};
