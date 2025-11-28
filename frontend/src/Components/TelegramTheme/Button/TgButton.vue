<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import type { PropType } from 'vue';
import type { Variant } from './types';

const props = defineProps({
    variant: {
        type: String as PropType<Variant>,
        default: 'fill'
    },
    block: {
        type: Boolean,
        default: false,
    },
    round: {
        type: Boolean,
        default: false,
    },
    disabled: {
        type: Boolean,
        default: false,
    }
})

const hover = ref(false);
const clicked = ref(false);

type ListItem = {
    variant: Variant,
    base: {[key: string]: string},
    hover: {[key: string]: string},
}

const list: ListItem[] = [
    {
        variant: 'fill',
        base: {
            color: 'white',
            backgroundColor: '#007AFF',
        },
        hover: {
            backgroundColor: '#2990FF',
        }
    },
]

const button = ref<InstanceType<typeof HTMLButtonElement>>();

function buildButton() {
    if (!button.value) return;
    
    const styles = list.find((el) => el.variant === props.variant) as ListItem

    for (const style in styles.base) {
        button.value.style.setProperty(style, styles.base[style]!)
    }

    if (props.disabled) {
        button.value.style.opacity = "0.3";

        return;
    }
    
    if (hover.value) {
        for (const style in styles.hover) {
            button.value.style.setProperty(style, styles.hover[style]!)
        }

        return;
    }
}

[hover, () => props.disabled].forEach(el => watch(el, buildButton))

onMounted(() => {
    if (!button.value) return;

    button.value.onmouseenter = () => hover.value = true;
    button.value.onmouseleave = () => {
        hover.value = false
        clicked.value = false
    };

    button.value.onmousedown = () => clicked.value = true
    button.value.onmouseup = () => clicked.value = false

    buildButton()
})

</script>

<template>
    <button ref="button" class="tg-btn" :class="[variant, (block ? 'w-full' : 'w-max'), (round ? 'rounded-[20px]' : 'rounded-lg')]">
        <slot />
    </button>
</template>

<style scoped lang="scss">
$primary-color: #007AFF;

.tg-btn {
    padding: 10px 16px;
    font-weight: 600;

    transition: .3s linear;
    cursor: pointer;
}
</style>