FROM node:alpine

RUN npm install -g nodemon

WORKDIR /app

ADD package.json package-lock.json ./

# needed for jpeg compression
RUN apk --no-cache add shadow \                                                                   
  gcc \                                                                                         
  musl-dev \                                                                                    
  autoconf \                                                                                    
  automake \                                                                                    
  make \                                                                                        
  libtool \                                                                                     
  nasm \                                                                                        
  tiff \                                                                                        
  jpeg \                                                                                        
  zlib \                                                                                        
  zlib-dev \                                                                                    
  file \                                                                                        
  pkgconf \  
  && npm install

ADD bin ./bin

# --legacy-watch needed for auto-reload on windows
CMD ["nodemon", "--legacy-watch"]