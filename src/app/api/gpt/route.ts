import { client } from "@/utils/openAi";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { searchQuery } = await request.json();
    console.log(searchQuery, "searchQuery");
    const gptQuery = `Act as a movie recommendation system and suggest me some movies for the query ${searchQuery} only give me names of 5 movies,comma separated like the example response.
    Example response:
    Shrek, The Dark Knight, The Godfather, Pulp Fiction, The Matrix`;

    const response = await client.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: gptQuery,
        },
      ],
    });

    return NextResponse.json({ movies: response.choices[0].message.content });
  } catch (error) {
    console.error("GPT API Error:", error);
    return NextResponse.json(
      { error: "Failed to get movie recommendations" },
      { status: 500 }
    );
  }
}
