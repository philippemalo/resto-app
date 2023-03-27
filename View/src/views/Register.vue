<script setup lang="ts">
import { signup } from "../services/api";
import { useAuthStore } from "../stores/auth";
import router from "../router";
import ColorfulContainer from "../components/ColorfulContainer.vue";
import { ref } from "vue";

const authStore = useAuthStore();

const accountCreationError = ref({ error: false, message: "" });

const register = async () => {
  const email = document.querySelector("input[name=email]") as HTMLInputElement;
  const password = document.querySelector(
    "input[name=password]"
  ) as HTMLInputElement;
  const secretKey = document.querySelector(
    "input[name=secretkey]"
  ) as HTMLInputElement;

  await signup(email.value, password.value, secretKey.value)
    .then((res) => {
      if (res.status === 200) {
        authStore.setUser(res.data);
        router.push("/");
      }
    })
    .catch((err) => {
      accountCreationError.value = {
        error: true,
        message: err.response.data.message,
      };
    });
};

addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    const element = document.activeElement as HTMLElement;
    if (!element) return;
    element.blur();
  }
});

addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const element = document.activeElement as HTMLElement;
    const passwordInput = document.querySelector(
      "input[name=password]"
    ) as HTMLElement;
    const secretKeyInput = document.querySelector(
      "input[name=secretkey]"
    ) as HTMLElement;
    if (!element) return;
    if (element === passwordInput || element === secretKeyInput) {
      register();
    }
  }
});
</script>

<template>
  <div
    v-if="accountCreationError.error"
    class="absolute top-5 left-1/2 transform -translate-x-1/2 border rounded p-2 bg-red-100 text-red-500"
  >
    {{ accountCreationError.message }}
  </div>
  <ColorfulContainer>
    <form class="flex flex-col text-lg font-light">
      <label name="email">Email address</label>
      <input
        class="p-1 rounded transition border hover:bg-slate-100 focus:bg-slate-100 focus:outline-none"
        type="email"
        name="email"
      />
      <label name="password">Password</label>
      <input
        class="p-1 rounded transition border hover:bg-slate-100 focus:bg-slate-100 focus:outline-none"
        type="password"
        name="password"
      />
      <label name="secretkey">Account creation key</label>
      <input
        class="p-1 rounded transition border hover:bg-slate-100 focus:bg-slate-100 focus:outline-none"
        type="password"
        name="secretkey"
      />
      <input
        class="bg-fuchsia-500 my-4 p-1 rounded text-white transition cursor-pointer hover:scale-105"
        type="button"
        value="Create Account"
        @click="register"
      />
    </form>
    <div class="mt-4">
      Already have an account?
      <router-link class="text-blue-600" to="/login">Sign in here</router-link>
    </div>
  </ColorfulContainer>
</template>
