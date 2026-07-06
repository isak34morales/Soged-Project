const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const router = express.Router();

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Initialize Google Gemini
const geminiApiKey = process.env.GOOGLE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(geminiApiKey);

// System prompt for Soggy AI
const SOGGY_SYSTEM_PROMPT = `Eres Soggy, la mascota oficial, guardián cultural y tutor experto en lenguas indígenas de Panamá (Guna, Ngäbe, Naso). Tu tono es amable, paciente y respetuoso. Si el usuario comete un error, analízalo con refuerzo positivo y explica la lógica cultural subyacente.`;

// POST /api/chat
router.post('/', async (req, res) => {
    try {
        const { user_id, message } = req.body;

        if (!user_id || !message) {
            return res.status(400).json({ error: 'user_id and message are required' });
        }

        // Step 1: Fetch last 5 messages from chat_history
        const { data: historyData, error: historyError } = await supabase
            .from('chat_history')
            .select('user_message, ai_response, created_at')
            .eq('user_id', user_id)
            .order('created_at', { ascending: false })
            .limit(5);

        if (historyError) {
            console.error('Error fetching chat history:', historyError);
            // Continue without history if fetch fails
        }

        // Step 2: Transform data into Gemini message history format
        const messageHistory = [];
        
        if (historyData && historyData.length > 0) {
            // Reverse to get chronological order
            const reversedHistory = historyData.reverse();
            
            reversedHistory.forEach(entry => {
                messageHistory.push({
                    role: 'user',
                    parts: [{ text: entry.user_message }]
                });
                messageHistory.push({
                    role: 'model',
                    parts: [{ text: entry.ai_response }]
                });
            });
        }

        // Step 3: Initialize Gemini model with history
        const model = genAI.getGenerativeModel({ 
            model: 'gemini-1.5-flash',
            systemInstruction: SOGGY_SYSTEM_PROMPT
        });

        // Step 4: Send new message with context
        const chat = model.startChat({
            history: messageHistory
        });

        const result = await chat.sendMessage(message);
        const response = result.response;
        const aiResponseText = response.text();

        // Step 5: Save conversation to Supabase for persistence
        const { error: insertError } = await supabase
            .from('chat_history')
            .insert({
                user_id: user_id,
                user_message: message,
                ai_response: aiResponseText,
                created_at: new Date().toISOString()
            });

        if (insertError) {
            console.error('Error saving chat history:', insertError);
            // Return response even if save fails
        }

        // Step 6: Return clean JSON response
        res.json({
            success: true,
            response: aiResponseText,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('Error in chat API:', error);
        res.status(500).json({ 
            error: 'Internal server error',
            message: error.message 
        });
    }
});

module.exports = router;
