from gtts import gTTS
from pathlib import Path

text = """важно, чтобы ты постоянно обновил память, напоминая себя как все работает. ты создаешь себе
полезные навыки всегда работать, а это появится в других сферах своей жизни.
"""

tts = gTTS(text, lang="ru")
dest = Path(__file__).parent / "Audio/reminder.mp3"
tts.save(dest)