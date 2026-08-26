нам нужны обе поток и объек для работы с потоком

```js
const stream = await navigator.mediaDevices.getUserMedia({audio: true});
const mediaRecorder = new MediaRecorder(stream, {
    mimeType: MediaRecorder.isTypeSupported('audio/webm') ? 'audio/webm' : 'audio/mp4'
});
```

нужно иметь массив, куда мы будем записивать чанки из потока. чанки получим из события "ondataavailable", надо устанавливать обработчик.
поэтом вот шаги:
- подготовить массив для сохранения данных из потока
```js
const dataChunksRef = useRef([]);
dataChunksRef.current = [];
```
- устанавливать обработчки для сборки данных из потока
```js
mediRecorder.ondataavailable = (event) => {
    dataChunksRef.current.push(event.data);
}
```
- установить обработчик для остановки записи, когда мы будем собирать все чанки вместе
```js
mediaRecorder.onstop = () => {
    const blob = new Blob(dataChunksRef.current, { type: 'audio/webm' });
    setAudioBlob(blob);

    stream.getTracks().forEach(track => track.stop());
}
```
- установить интервал для начала записи и сборки данных из потока. данные собираются как blob.
```js
mediaRecorder.start(100);
```

когда блоб уже есть мы можем создать файл и использовать его.
```js
const file = new File(blob, filename, { type: 'audio/webm' });

```