---
title: Dead simple digital guitar pedals in C
keywords: guitar pedal c simple
date: 2026-05-25
---

There's something I hate about the entire "professional digital audio workstation ecosystem", it's the complexity.

Now I get why its so complex, it's for user simplicity. But I'm a programmer, I love tinkering, and I especially like simplicity in developing.

Simplicity kind of fights the whole idea of VST plugins (or similar things). They have big SDKs that require you to conform to it's philosophies and all that bullshit.

So I just replaced the entire workflow with this:

`arecord | weird little C pedal programs | aplay`

And somehow it just works. It just builds on Unix philosophies of making simple and transparent software, as well as using pipes and simple Linux tools (`aplay`, `arecord`)

Each little pedal works something like this: (C pseudocode)

```c
int main(int argc, char *argv[]) {
    init_arg(argc,argv); // Sets CLI arguments for a pedal once.
    while (1) {
        size_t n = fread(in_i16, sizeof(int16_t), BLOCK_SIZE, stdin); // read raw data from arecord or previous pedal
        if (n == 0) break; // abort if no data received
        /* Convert i16 to float */
        effect(in_f, out_f, n); // run the effect for the current block of data
        /* Make sure output isn't too loud and convert back to i16 */
        fwrite(out_i16, sizeof(int16_t), n, stdout); // write raw data to next pedal or aplay
    }
}
```

And a pedal looks something like this:

```c
static float gain;

void init_arg(int argc, char **argv) {
  if (argc != 1) // Validate argument count
    error("Invalid arguments", "Usage: boost <gain>");
  gain = atof(argv[0]); // Store argument once (arguments starts at 0, check the source code i dare you)
}

// Very simple gain pedal
void effect(const float *in, float *out, int n) {
  for (int i = 0; i < n; i++) {
    out[i] = in[i] * gain; // this is where math is done, most pedals should be a little more complex than this.
  }
}
```

That's it. Just a small set of small programs to be chained together to produce cool guitar effects.

There's also a little helper CLI which keeps you from entering the wrong parameters into arecord and aplay.

Anyways that's basically it for this post. E-mail me patches [Guide](https://git.spelis.li/#patches) for new cool pedals or bugfixes.

Some of the code is admittedly a little cursed, but honestly if the signal goes in and comes back out sounding cooler, I consider that a success.
