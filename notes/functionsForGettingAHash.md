хеши помогают при унификации данных, например генерация идентификтара, цены, имен файлов, номеров заявок и тд. посмотрим какие функции присутствуют в разных языках программировании.

**bin2hex - php**
```php
$hash = bin2hex(random_bytes(32)) // 64 символа
```

**md5, hash - php**
```php
$hash = md5($str); // 32 байт (символов)
$hash = hash('sha256', $str) // 64 байт (символов)

 // функции возвращают один и тот же хеш для одного и того же аргумента
```

**uuid.uuid1,3,4 (32 байт)**
```python
import uuid
uid4 = uuid.uuid4().hex
uid1 = uuid.uuid1().hex
uuid3 = uuid.uuid3(
 uuid.uuid1(),
 uuid.uuid4().hex
).hex
```

**MD5 - SQL**
```sql
title_hash CHAR(32) GENERATED ALWAYS AS (MD5(title)) STORED;
```
