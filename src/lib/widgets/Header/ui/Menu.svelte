<script lang='ts'>
	import { page } from "$app/stores";
	import { userStore } from "$appLayer/stores/user";

    interface $$Props {
        class?:string
    }
    
    let className = ''
    export { className as class }

    $: items = [
        {
            id: 'santa',
            href: '/events/gift/9p3s1pk3mx88swv',
            text: 'Тайный Cанта🎅'
        },
        ...($userStore.isLoggedIn ? [
            {
                id: 'tokens',
                href: '/tokens',
                text: 'Токены',
            }
        ] : [])
    ]
</script>

{#if items.length}
    <nav class={`HeaderMenu ${className}`}>
        {#each items as item (item.id)}
            <a  
                href={item.href}
                class='HeaderMenu__item'
                class:HeaderMenu__item_active={$page.url.pathname.startsWith(item.href)}
            >
                {item.text}
            </a>
        {/each}
    </nav>    
{/if}

<style lang='sass'>
    .HeaderMenu
        &__item
            font-weight: 600
            position: relative
            &:hover
                @media (min-width: $sm)
                    &::after
                        width: calc(100% + 6px)
            &::after
                content: ''
                display: block
                position: absolute
                z-index: -1
                width: 0
                height: 2px
                bottom: 0px
                left: -3px
                background: var(--clue-color-primary-400)
                transition: .1s ease-in-out
                transition-property: width, height
            &:not(:last-child)
                margin-right: 20px
            &_active
                &::after
                    width: calc(100% + 6px)
                    height: 5px            
</style>