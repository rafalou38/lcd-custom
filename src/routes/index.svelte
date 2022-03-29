<script lang="ts">
	import Highlight from 'svelte-highlight';
	import arduino from 'svelte-highlight/src/languages/arduino';
	import theme from 'svelte-highlight/src/styles/atelier-sulphurpool-light';
</script>

<svelte:head>
	<title>LCD custom for arduino generate and find characters</title>
	<meta
		name="description"
		content="Website for arduino users to find, share and create custom characters for LCD displays. These characters can then be used on arduino projects or anything you want with the png image."
	/>
	{@html theme}
</svelte:head>

<div class="container mx-auto max-w-6xl">
	<h1 class="my-4 text-4xl font-bold">Find and create lcd characters.</h1>
	<div class="ml-2">
		<p>
			Are you bored of always using the same <strong>characters</strong> in the lcd displays of your
			<strong>arduino projects</strong>?
		</p>
		If you want to make your project unique it's easy make a custom one!
		<p />
		<p>
			But, if you ever tried doing so you'l know it easier said than done. And that's why I created
			this website.
		</p>
		<h2 class="my-2 mt-8 text-2xl font-bold">Create</h2>
		<div class="ml-2">
			<p>
				Use the editor to create your own characters a <strong>generate</strong> the corresponding code
				for it.
			</p>
			<a href="/editor" class="my-4 flex w-max rounded bg-indigo-600 px-4 py-2 text-white"
				>Open Editor</a
			>
		</div>
		<h2 class="my-2 mt-8 text-2xl font-bold">Browse</h2>
		<div class="ml-2">
			<p>
				If you don't want to bother making your own <strong>characters</strong>, You can just open
				the library and find one that suits your needs. Or even find inspiration for your own.
			</p>
			<a href="/editor" class="my-4 flex w-max rounded bg-indigo-600 px-4 py-2 text-white"
				>Browse characters</a
			>
		</div>
		<h2 class="my-2 mt-8 text-2xl font-bold">How to use with arduino</h2>
		<p>
			If you want to use the characters you created in your arduino project, here is an example on
			how to do it.
		</p>
		<Highlight
			language={arduino}
			class="my-4 overflow-hidden rounded-xl"
			code={`// choose a name with a different number for each character
#define name 0

//load the code given by LCD - Custom
byte nameData[] = {
	B00000,
	B11111,
	B10001,
	B10101,
	B10101,
	B10001,
	B11111,
	B00000
};

void setup()
{
	lcd.begin(16, 2);

	// Initialize the characters
	lcd.createChar(name, nameData);
}

void loop()
{
	lcd.setCursor(0, 0);
	
	lcd.print("Hello World!");
	
	// Use your character
	lcd.write(byte(name));
}
`}
		/>
	</div>
</div>
