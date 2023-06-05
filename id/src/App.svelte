<script>
  import {
    useForm,
    validators,
    HintGroup,
    Hint,
    maxLength,
    minLength,
    required
  } from 'svelte-use-form';

  import axios from 'axios';

  const searchParams = new URLSearchParams(window.location.search);
  const redirectParam = searchParams.get('redirect');

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
        if (res.data?.token == null) {
          throw new Error('Could not retrieve token');
        }

        alert('Everything went good!');
        if (redirectParam) {
          window.location.href = redirectParam + '?token=' + res.data.token;
        }
      })
      .catch((err) => {
        console.error(err);
        if (err.code === 'ERR_BAD_REQUEST') {
          alert('Invalid credentials');
        } else {
          alert('Something went wrong: ' + err.message);
        }
      });
  };
</script>

<div class="outer-container">
  <div class="content-container">
    <form use:form on:submit|preventDefault={submitForm}>
      <h1>Login</h1>

      <div class="form-input">
        <label for="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          use:validators={[required, minLength(3), maxLength(16)]}
        />
        <HintGroup for="username">
          <Hint on="required">Required</Hint>
          <Hint on="minLength" hideWhenRequired let:value
            >Minimum length {value}</Hint
          >
          <Hint on="maxLength" hideWhenRequired let:value
            >Maximum length {value}</Hint
          >
        </HintGroup>
      </div>

      <div class="form-input">
        <label for="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          use:validators={[required, minLength(6), maxLength(32)]}
        />
        <HintGroup for="password">
          <Hint for="password" on="required">Required</Hint>
          <Hint on="minLength" hideWhenRequired let:value
            >Minimum length {value}</Hint
          >
          <Hint on="maxLength" hideWhenRequired let:value
            >Maximum length {value}</Hint
          >
        </HintGroup>
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
