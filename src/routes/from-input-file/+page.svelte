<script lang="ts">
  export let data;
  export let form;
</script>

<h1>From input file</h1>

<form method="POST" enctype="multipart/form-data">
  <input type="file" name="image_file" id="" />
  <button>Submit</button>
</form>

{#if form?.success}
  <p>Success!</p>
{/if}

<pre>{JSON.stringify(form, null, 2)}</pre>
