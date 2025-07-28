export const extractText = (resp) => {
  try {
    const text =
      resp?.response?.candidates?.[0]?.contet?.parts?.[0]?.text ??
      resp?.candidates?.[0]?.content?.parts?.[0]?.text ??
      resp?.response?.candidates?.[0]?.content?.text;

    return text ?? JSON.stringify(resp, null, 2);
  } catch (error) {
    console.error("Error Extract file", error);

    return JSON.stringify(resp, null, 2);
  }
};

export const defaultPrompt = (type) => {
  switch (type) {
    case "image":
      return "Describe this image";
    case "audio":
      return "Transcript this audio";
    default:
      return "Create a summary of this document";
  }
};
