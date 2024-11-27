import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import OpenAI from 'openai'
import { ChatCompletion } from 'openai/resources';
import { systemPrompt } from 'src/common/utils';
import { Message } from 'src/interfaces/index.interface';

@Injectable()
export class OpenAiService {

    readonly openai: OpenAI; 

    constructor() {
        this.openai = new OpenAI({
            organization: process.env.OPENAI_ORGANIZATION,
            apiKey: process.env.OPENAI_API_KEY
        })
    }

    async chatGptRequest(prompt: string, messages: Message[]) {
        try {
            // Convert the message history to the format required by the OpenAI API
            const history = messages.map((message) => ({
                role: message.ai ? 'assistant' : 'user',
                content: message.text
            }))

            // Make a request to the ChatGPT model
            const completion: ChatCompletion = await this.openai.chat.completions.create({
                model: 'chatgpt-4o-latest',
                messages: [
                    {
                        role: 'system',
                        content: `${systemPrompt} ${prompt}`
                    },
                ],
                temperature: 0,
                max_tokens: 1000,
            })


            // Extract the content from the response
            const [content] = completion.choices.map((choice) => choice.message.content);

            return content;
        } catch (error) {
            // Log and propagate the error
            console.error(error);
            throw new ServiceUnavailableException('Failed request to OpenAI');
        }
    }
}
