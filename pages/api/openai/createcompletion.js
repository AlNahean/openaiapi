import { OpenAi } from "../../../lib/Openai/OpenAiConfig";

export default async (req, res) => {
  try {
    if (req.method === "POST") {
      let {
        prompt,
        languageModel = "text-davinci-003",
        maxTokens = 120,
        temperature = 0,
      } = req.body;

      if (!prompt) {
        res
          .status(404)
          .json({ prompt: "You need to pass prompt to get an answer" });
        return;
      }
      const { data } = await OpenAi.createCompletion({
        model: languageModel,
        prompt: prompt,
        max_tokens: maxTokens,
        temperature: temperature,
      });

      console.log(prompt, "prompt ");
      //   let { data } = await OpenAi.listModels();

      //   console.log(response.data);
      console.log(data);
      res.status(200).json({
        text: "requesting post method success",
        languageModel,
        prompt,
        answer: data.choices[0].text,
        createdAt: Date.now(),
      });
      return;
    }
    res.status(200).json({ name: "John Doe" });
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
