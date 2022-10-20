FROM golang:alpine3.16 as builder

WORKDIR /go/src

RUN go mod init module
RUN go mod download && go mod verify 

COPY hello.go .

RUN go build -v -o hello .

FROM scratch

WORKDIR /go/src

COPY --from=builder /go/src/hello .

CMD ["./hello"]