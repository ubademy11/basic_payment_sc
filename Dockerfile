FROM node:12

WORKDIR /app

COPY . /app

EXPOSE 3003

RUN yarn

ENV MNEMONIC='viable cement sugar uncover oval fiction orchard rain code require accident sea'
ENV INFURA_API_KEY=f4de474d6ec2495da21f350b47b064a1
ENV INFURA_API_SECRET=c8196ec272a4456e878fd3222bed621e
ENV INFURA_URL=https://kovan.infura.io/v3/f4de474d6ec2495da21f350b47b064a1

ENV PORT=3003
ENV CRYPTO_KEY=c5ff42196ee364072b855e6eae1f1bde
ENV CRYPTO_IV=d084b7e0ad84ac00
ENV NODEJS_LOGGER_FILES_PATH=console
ENV DB_URI=postgres://gyhzsrfkfiqjdx:e631b241bc86e91ec12c083d4ecd6cb057a89dda181ef296c0eb026f62057479@ec2-44-195-186-223.compute-1.amazonaws.com:5432/d8ugduoobogmlg

CMD yarn start