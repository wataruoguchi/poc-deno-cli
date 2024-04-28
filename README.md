# PoC: CLI app with Deno

Following
[Build a Cross-Platform CLI with Deno in 5 minutes](https://deno.com/blog/build-cross-platform-cli).

## IDE config

[Visual Studio Code](https://docs.deno.com/runtime/manual/getting_started/setup_your_environment#visual-studio-code)

## Commands

### Test

```sh
deno test --unstable-kv --allow-write --allow-read
```

### Compile

```sh
deno compile --output greetme --allow-read --allow-write --unstable-kv main.ts
```
