<template>
  <div v-if="!user">
    <h1>Not logged in</h1>
    <a class="btn-lightning" href="/api/login">
      <svg
        width="20"
        height="20"
        class="mr-3"
        viewBox="0 0 200 307"
        fill="white"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M56 0L107.606 131H90.2129H89L1.52588e-05 131L177 307L106.979 165H121H160H200L56 0Z"
        ></path>
      </svg>
      <span style="margin-left: 0.25rem">Login with Lightning</span>
    </a>
  </div>
  <div v-else>
    <h1>Logged in as</h1>
    <h2>{{ user.id }}</h2>
    <a class="btn-lightning" href="/api/logout"> Logout </a>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";

const user = ref(null);

onBeforeMount(async () => {
  user.value = await getUser();
});

async function getUser() {
  let user;
  try {
    const res = await fetch("/api/user");
    if (res.status === 200) {
      user = await res.json();
    } else {
      user = null;
    }
  } catch (error) {
    console.log(error);
    user = null;
  }
  return user;
}
</script>

<style scoped>
.btn-lightning {
  width: 250px;
  background-color: #f5a623;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 12px 16px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
}
</style>
