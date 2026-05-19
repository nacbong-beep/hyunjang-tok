self.addEventListener('fetch', event => {
  if(event.request.method === 'POST' && event.request.url.includes('hyunjang-tok')) {
    event.respondWith((async () => {
      const formData = await event.request.formData();
      const file = formData.get('shared_file');
      if(file) {
        const text = await file.text();
        const cache = await caches.open('shared-files');
        await cache.put('shared-text', new Response(text));
      }
      return Response.redirect('/', 303);
    })());
  }
});
