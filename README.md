# api-rest

##Instalación NodeJS Y MongoDB

**Primero que nada, instalemos nodejs. Para Ubuntu ocupe la version 4.4.3 copiamos lo siguiente:**

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

4. Instalaremos la ultima versión de MongoDB:

```
sudo apt-get install -y mongodb-org
```

Para mas informacion y otras distribuciones/versiones de  [MongoDB](https://docs.mongodb.org/manual/installation/).
