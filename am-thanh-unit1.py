# Tạo 23 file âm thanh Unit 1 bằng giọng Anh-Anh của Microsoft (edge-tts).
# Cách dùng (chạy trên máy của bạn, cần internet):
#   pip install edge-tts
#   python tao_am_thanh_unit1.py
# Kết quả nằm trong thư mục "audio" ngay cạnh file này. Chép các file vào thư mục audio của site.
import asyncio, os
import edge_tts

# loại giọng trong site -> (giọng Microsoft, tốc độ, cao độ)
VOICES = {
    "f":   ("en-GB-SoniaNeural",  "+0%",  "+0Hz"),    # Cô Hoa: nữ trung niên
    "f2":  ("en-GB-LibbyNeural",  "+0%",  "+0Hz"),    # Mẹ: nữ trung niên
    "fo":  ("en-GB-SoniaNeural",  "-22%", "-18Hz"),   # Bà: nữ lớn tuổi, chậm, trầm
    "mc":  ("en-GB-RyanNeural",   "+0%",  "+38Hz"),   # Nam: bé trai
    "mc2": ("en-GB-ThomasNeural", "+0%",  "+34Hz"),   # Tom: bé trai
    "fc":  ("en-GB-MaisieNeural", "+0%",  "+0Hz"),    # Mai: bé gái (giọng trẻ em)
}
ITEMS = [
 [
  "good-morning-nam-nice-to-s-1h7gp4d.mp3",
  "f",
  "Good morning, Nam. Nice to see you again."
 ],
 [
  "good-morning-1olmdp.mp3",
  "f",
  "Good morning"
 ],
 [
  "nice-to-see-you-again-uryvba.mp3",
  "f",
  "Nice to see you again"
 ],
 [
  "good-morning-miss-hoa-nice-14b0gp9.mp3",
  "mc",
  "Good morning, Miss Hoa. Nice to see you, too."
 ],
 [
  "how-are-you-n1c8x8.mp3",
  "f",
  "How are you?"
 ],
 [
  "i-m-fine-thank-you-and-you-16h3w5r.mp3",
  "mc",
  "I'm fine, thank you. And you?"
 ],
 [
  "i-m-fine-thank-you-v2y1n6.mp3",
  "mc",
  "I'm fine, thank you"
 ],
 [
  "and-you-1sfms8z.mp3",
  "mc",
  "And you?"
 ],
 [
  "good-afternoon-nam-hctkj5.mp3",
  "mc2",
  "Good afternoon, Nam."
 ],
 [
  "good-afternoon-1fnrovv.mp3",
  "mc2",
  "Good afternoon"
 ],
 [
  "good-afternoon-tom-dwh03.mp3",
  "mc",
  "Good afternoon, Tom."
 ],
 [
  "goodbye-nam-see-you-tomorr-14squuu.mp3",
  "mc2",
  "Goodbye, Nam. See you tomorrow."
 ],
 [
  "goodbye-w0uaa7.mp3",
  "mc2",
  "Goodbye"
 ],
 [
  "see-you-tomorrow-gjfs3t.mp3",
  "mc2",
  "See you tomorrow"
 ],
 [
  "bye-nam-see-you-later-c8wwd2.mp3",
  "fc",
  "Bye, Nam. See you later!"
 ],
 [
  "see-you-later-1b53agv.mp3",
  "fc",
  "See you later"
 ],
 [
  "good-evening-grandma-1y7ocvx.mp3",
  "mc",
  "Good evening, Grandma."
 ],
 [
  "good-evening-1ijnhrd.mp3",
  "mc",
  "Good evening"
 ],
 [
  "good-evening-nam-goodbye-s-m1qhf9.mp3",
  "fo",
  "Good evening, Nam. Goodbye. See you soon!"
 ],
 [
  "see-you-soon-1ucn2oi.mp3",
  "fo",
  "See you soon"
 ],
 [
  "good-night-nam-1v9726t.mp3",
  "f2",
  "Good night, Nam."
 ],
 [
  "good-night-eig673.mp3",
  "f2",
  "Good night"
 ],
 [
  "good-night-mum-qgi5i8.mp3",
  "mc",
  "Good night, Mum."
 ]
]

async def main():
    os.makedirs("audio", exist_ok=True)
    for fname, v, text in ITEMS:
        voice, rate, pitch = VOICES[v]
        out = os.path.join("audio", fname)
        if os.path.exists(out):
            continue
        await edge_tts.Communicate(text, voice, rate=rate, pitch=pitch).save(out)
        print("ok", fname)

asyncio.run(main())
