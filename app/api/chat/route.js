import Groq from "groq-sdk";
import { NextResponse } from 'next/server';

const groq = new Groq({ 
  apiKey: process.env.GROQ_API_KEY 
});

// System prompt - customize this for your chatbot's behavior
const SYSTEM_PROMPT = `أنت مساعد آلي لمركز رسالة للقلب والأوعية الدموية.

**معلومات المركز:**
- الاسم: مركز رسالة للقلب والأوعية الدموية
- العنوان: أمام مستشفى الباطنة والقصر العيني الفرنساوي، فوق صيدلية الشمس، الدور الثالث
- مواعيد العمل: من 12 ظهراً إلى 12 منتصف الليل يومياً
- رقم التواصل (واتساب ومكالمات): 01127779055

**الفحوصات والأسعار:**

دكتور سيد الشبراوي:
- إيكو للكبار: 350 جنيه
- إيكو أطفال وحديثي الولادة والأجنة: 450 جنيه
- هولتر 24 ساعة: 450 جنيه
- هولتر 48 ساعة: 800 جنيه
- كشف: 600 جنيه

دكتور أكرم:
- دوبلر ملون على الشرايين والأوردة: 400 جنيه
- سونار على البطن والحوض: 400 جنيه
- دوبلر على الخصيتين: 400 جنيه

**تعليماتك:**
1. رد فقط على الأسئلة المتعلقة بالمعلومات أعلاه (العنوان، المواعيد، الفحوصات، الأسعار، التواصل)
2. كن واضحاً ومحدداً في إجاباتك
3. لا تتحدث عن أي مواضيع خارج نطاق المركز
4. لا تعد بحفظ أو تخزين أي بيانات - أنت لا تملك قاعدة بيانات
5. إذا لم يكن السؤال واضحاً، اقترح على المستخدم إعادة صياغة السؤال أو التواصل مباشرة عبر واتساب أو الهاتف على: 01127779055
6. كن مهذباً ومحترفاً في ردودك
7. اكتب بالعربية دائماً`;

export async function POST(request) {
  try {
    const { messages } = await request.json();

    // Add system prompt as the first message
    const messagesWithSystem = [
      {
        role: "system",
        content: SYSTEM_PROMPT
      },
      ...messages
    ];

    const chatCompletion = await groq.chat.completions.create({
      messages: messagesWithSystem,
      model: "openai/gpt-oss-20b",
      temperature: 0.5,
      max_tokens: 1024,
    });

    return NextResponse.json({
      message: chatCompletion.choices[0]?.message?.content || "No response"
    });
  } catch (error) {
    console.error('Groq API Error:', error);
    return NextResponse.json(
      { error: 'Failed to get response from AI' },
      { status: 500 }
    );
  }
}