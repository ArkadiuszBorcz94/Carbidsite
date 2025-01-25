FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

#Trzeba skopiować  wszystkie .csproj  i przywróć jako oddzielne warstwy dla każdego pliku dockerfile w projekcie,
#  pobierze go z systemu plików i skopuje go do katalogu roboczego docker
COPY Carbidsite.sln Carbidsite.sln
COPY src/AuctionService/AuctionService.csproj src/AuctionService/AuctionService.csproj
COPY src/SearchingService/SearchingService.csproj src/SearchingService/SearchingService.csproj
COPY src/GatewayServices/GatewayServices.csproj src/GatewayServices/GatewayServices.csproj
COPY src/BiddService/BiddService.csproj src/BiddService/BiddService.csproj
COPY src/IdentificationService/IdentificationService.csproj src/IdentificationService/IdentificationService.csproj
COPY src/Contract/Contract.csproj src/Contract/Contract.csproj

#Przywróć pakiet
RUN dotnet restore Carbidsite.sln


# Kopiowanie folderów aplikacji
COPY src/GatewayServices src/GatewayServices
COPY src/Contract src/Contract
WORKDIR /app/src/GatewayServices
RUN dotnet publish -c Release -o /app/src/out




#budowanie obrazu
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/src/out .
ENTRYPOINT [ "dotnet", "GatewayServices.dll" ]