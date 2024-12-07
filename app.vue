<template>
  <div class="page" ref="application">
    <div class="logos">
      <NuxtImg
        src="/logos/cazetv_horizontal.png"
        alt="CazeTV"
        class="caze-logo"
      />
      <NuxtImg src="/icons/plus.svg" alt="Mais" class="plus" />
      <NuxtImg
        src="/logos/logo-hemocione-principal.svg"
        alt="Hemocione"
        class="hemo-logo"
      />
    </div>
    <h2 class="congrats">
      {{ congratsText }}
    </h2>

    <div class="buttons">
      <button class="hemocione-instagram" @click="goToInstagram">
        <NuxtImg src="/logos/instagram-logo.svg" alt="Instagram" />
        Seguir o Hemocione
      </button>
      <button class="twitch" @click="goToTwitch">
        <NuxtImg src="/logos/twitch-logo.svg" alt="Twitch" />
        Acompanhar a Transmissão
      </button>
      <button class="hemocione-website" @click="goToWebsite">
        <NuxtImg
          src="/logos/gota.svg"
          alt="Hemocione"
          class="hemo-logo-button"
        />
        Conhecer o Hemocione
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const router = useRouter();
const token = route.query.token;
import party from "party-js";

party.resolvableShapes["gota"] =
  "<img src='/logos/gota.svg' style='width: 16px; height: 16px;'>";

const application = ref<HTMLDivElement | null>(null);

let congratsText = "Obrigado por participar dos 2 anos da Cazé TV!";

if (token) {
  router.replace({ query: { ...route.query, token: undefined } });
  const tokenDecoded = currentUserTokenDecoder(String(token));
  if (tokenDecoded?.givenName) {
    congratsText = `${tokenDecoded.givenName}, obrigado por participar dos 2 anos da Cazé TV!`;
  }

  if (tokenDecoded) {
    const userData: UserData = {
      name: tokenDecoded.givenName,
      email: tokenDecoded.email,
      phone: tokenDecoded.phone,
      id: tokenDecoded.id,
    };
    notifyAccess(userData);
  }
}

const goToInstagram = () => {
  window.open("https://www.instagram.com/hemocione/");
};

const goToTwitch = () => {
  window.open("https://www.twitch.tv/casimito");
};

const goToWebsite = () => {
  window.open("https://hemocione.com.br/");
};

onMounted(() => {
  if (!application.value) return;

  party.confetti(application.value, {
    shapes: ["gota"],
    count: party.variation.range(50, 100),
    size: party.variation.range(0.6, 1.5),
  });
});
</script>

<style scoped>
.page {
  height: 100svh;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 2rem 1rem;
  gap: 2rem;
  text-align: center;
  justify-content: center;
}

.logos {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.caze-logo {
  width: 40%;
}

.hemo-logo {
  width: 40%;
}

.plus {
  width: 10%;
}

.buttons {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
}

button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  height: 4rem;
  align-self: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.6);
}

button img {
  width: 24px;
  height: 24px;
}

/* Estilos específicos para cada botão */
.hemocione-instagram {
  background-color: white; /* Rosa Instagram */
}

.hemocione-instagram:hover {
  opacity: 0.6;
}

.twitch {
  background-color: #9146ff; /* Roxo Twitch */
  color: white;
}

.twitch:hover {
  background-color: #772ce8;
}

.hemocione-website {
  background-color: white; /* Cor Hemocione */
}

.hemocione-website:hover {
  opacity: 0.6;
}

.hemo-logo-button {
  width: 24px;
  height: auto;
}
</style>
