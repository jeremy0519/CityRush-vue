<template>
    <header>
        <Navbar />
    </header>

    <main class="container">
        <RouterView />
    </main>

    <FooterBar />
</template>

<script setup>
import Navbar from '@/components/Navbar.vue'
import FooterBar from '@/components/FooterBar.vue'
</script>
