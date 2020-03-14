#variable to hold domain name, replace with desired domain
domain='localhost' 

#create the certificate and private key
openssl req -x509 -out $domain.crt -keyout $domain.key \
  -newkey rsa:2048 -nodes -sha256  \
  -subj "/C"

sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout ./localhost.key -out ./localhost.crt