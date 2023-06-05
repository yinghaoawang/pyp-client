<script>
  import {
    useForm,
    validators,
    HintGroup,
    Hint,
    email,
    required
  } from 'svelte-use-form';

  import axios from 'axios';

  const form = useForm();
  const submitForm = (evt) => {
    const formData = new FormData(evt.target);
    const data = {};
    for (let field of formData) {
      const [key, value] = field;
      data[key] = value;
    }

    axios
      .post('http://localhost:3000/login', data)
      .then((res) => {
        console.log('Everything went good: ', res.data);
      })
      .catch((err) => {
        console.error(err);
        if (err.code === 'ERR_BAD_REQUEST') {
          alert('Invalid credentials');
        } else {
          alert('Something went wrong: ' + err.code);
        }
      });
  };
</script>

<div class="outer-container">
  <div class="content-container">
    <form use:form on:submit|preventDefault={submitForm}>
      <h1>Login</h1>

      <div class="form-input">
        <label for="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          use:validators={[required, email]}
        />
        <HintGroup for="email">
          <Hint on="required">Required</Hint>
          <Hint on="email" hideWhenRequired>Email is not valid</Hint>
        </HintGroup>
      </div>

      <div class="form-input">
        <label for="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          use:validators={[required]}
        />
        <Hint for="password" on="required">Required</Hint>
      </div>

      <div class="form-input">
        <button disabled={!$form.valid}>Login</button>
      </div>
    </form>
    <details>
      <pre>{JSON.stringify($form, null, ' ')}</pre>
    </details>
  </div>
</div>

<style>
  :global(.touched:invalid) {
    border-color: red;
    outline-color: red;
  }

  .form-input {
    margin-bottom: 15px;
  }

  label {
    display: block;
  }

  .outer-container {
    max-width: 350px;
    margin: 0 auto;
  }

  .content-container {
    width: 100%;
    background: #444;
    padding: 40px;
  }

  h1 {
    margin-top: 0;
  }

  input {
    width: 100%;
  }

  pre {
    max-height: 200px;
    overflow: auto;
    background-color: black;
    padding: 20px;
  }
</style>
