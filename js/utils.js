async function fetchTemplate() {
    const response = await fetch('dynamic-service.html');
    return await response.text();
}

function fillTemplate(template, service) {
    return template
        .replace(/{{bgClass}}/g, service.bgClass)
        .replace(/{{name}}/g, service.name)
        .replace(/{{videoUrl}}/g, service.videoUrl)
        .replace(/{{times}}/g, service.times.join("<br>"))
        .replace(/{{music}}/g, service.music)
        .replace(/{{parking}}/g, service.parking);
}

async function generateServiceHTML(service) {
    const template = await fetchTemplate();
    return fillTemplate(template, service);
}
