# API docs

## ๐ ๊ฒ์ํ
 
<details>
  <summary>์ ์ฒด ๋ชฉ๋ก ์กฐํ API</summary>

### Request

- Method: `GET`
- URL: `/post`

### Response

- HTTP Status Code: `200`
- Payload:
  ```jsx
  // upload_date์ ๊ธฐ์ค์ผ๋ก ๋ด๋ฆผ์ฐจ์ ์ ๋ ฌ๋ Array
  {post_id : number,nickname : string,post_img : img_url(string),post_content : string,post_like : number,upload_date : date ,img_position : left or right or default}[]
  ```
</details>


<details>
  <summary>๊ธ ์์ธ ์กฐํ API</summary>

### Request

- Method: `GET`
- URL: `/post/:postId`
### Response

- HTTP Status Code: `200`
- Payload:
    
    ```jsx
    { name: string, title: string, content: string, date: string, post_id: number }
    ```
    </details>


<details>
  <summary>์ถ๊ฐ API</summary>

### Request

- Method: `POST`
- URL: `/post`
- Headers: { authorization: `Bearer ${token}` }
- Body:
    ```jsx
    { post_content: string, post_img: string, img_position : left or right or default }
    ```

### Response

- HTTP Status Code: `201`
- Payload:
    
    ```jsx
    { msg: string }
    ```

</details>


<details>
  <summary>์์  API</summary>

### Request

- Method: `PUT`
- URL: `/post/:postId`
- Headers: { authorization: `Bearer ${token}` }
- Body:
    
    ```jsx
    { post_img: string, post_content: string,  img_position : left or right or default }
    ```

### Response

- HTTP Status Code: `200`
- Payload:
    
    ```jsx
    { msg: string }
    ```
</details>

<details>
  <summary>์ญ์  API</summary>

### Request

- Method: `DELETE`
- URL: `/post/:postId`
- Headers: { authorization: `Bearer ${token}` }

### Response

- HTTP Status Code: `200`
- Payload:
    
    ```jsx
    { msg: string }
    ```
</details>


<details>
  <summary>์ข์์ API</summary>

### Request

- Method: `PUT`
- URL: `/post/:postId/like`
- Headers: { authorization: `Bearer ${token}` }

### Response

- HTTP Status Code: `200`
- Payload:
    
    ```jsx
    { msg: string, like_check: boolean }
    ```
</details>
___

    
## ๐ ํ์๊ด๋ฆฌ

<details>
  <summary>ํ์๊ฐ์ API</summary>

### Request

- Method: `POST`
- URL: `/register`
- Body:
    ```jsx
    { user_id: string, nickname: string, user_pw: string , pw_check: string  }
    ```
### Response

- HTTP Status Code: `200`
- Payload:
    ```jsx
    { mag: string }
    ```
</details>


<details>
  <summary>๋ก๊ทธ์ธ API</summary>

### Request

- Method: `POST`
- URL: `/login`
- Body:
    ```jsx
    { name: string, comment: string }
    ```

### Response

- HTTP Status Code: `200`
- Payload:
    
    ```jsx
    { msg: string, mytoken: token_string, nickname:string}
    ```

</details>

