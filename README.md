# api-rest

##Instalando NodeJS Y MongoDB

**Primero que nada, instalamos nodejs. Para Ubuntu ocupe la versión 4.4.3 copiamos lo siguiente:**

```
curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
sudo apt-get install -y nodejs
```
Para otras versiones o distribuciones, puedes ir a la [pagina oficial](https://nodejs.org/en/download/package-manager/).

**Ahora instalamos MongoDB**

1. Ejecuta el siguiente comando para importar la clave pública GPG MongoDB:

```
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
```

2. Crear un archivo de lista de MongoDB:
```
echo "deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list
```
3. Recargar los paquetes locales
```
sudo apt-get update
```

4. Instalaremos la última versión de MongoDB:

```
sudo apt-get install -y mongodb-org
```

Para mas informacion y otras distribuciones/versiones de  [MongoDB](https://docs.mongodb.org/manual/installation/).

##Package.json
En este archivo lo que haremos será instalar las dependencias de nuestra api-rest, que es el primer código usado, también hay otras maneras de instalar estas dependencias. Por el momento esta se me ha hecho la mas comoda.

Por lo tanto package.json tendrá:
```
{
 "name": "node-api-rest",
 "version": "0.0.1",
 "dependencies": {
 "mongoose": "~4.4.12",
 "express": "^4.7.1",
 "method-override": "^2.3.5",
 "body-parser": "^1.15.0"
 }
}
```
* Mongoose es la librería que nos va ayudar a conectar con mongoDB
* Express nos va a ayudar a implementar los métodos de ruta HTTP: GET, POST, etc.
* Method-override va hacer la llamada para enviar una solicitud POST a una URL con el método reemplazado como el valor de esa clave cadena de consulta. Este método de utilizar un valor de la consulta normalmente se utiliza en conjunción con llanura HTML <form> elementos cuando se trata de apoyar navegadores antiguos pero todavía utilizar métodos más nuevos.
* body-parser permitimos que se pueda parsear JSON, analizando ya sea función o cadena.
