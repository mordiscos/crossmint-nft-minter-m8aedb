import axios from 'axios';

const API_KEY = 'your_crossmint_api_key';
const API_BASE_URL = 'https://www.crossmint.com/api';

async function createNFTCollection() {
    const requestBody = {
        chain: "polygon",
        metadata: {
            name: "Sample NFT Collection",
            imageUrl: "https://www.crossmint.com/assets/crossmint/logo.png",
            description: "This is a sample NFT collection created via API",
            symbol: "XMINT"
        },
        fungibility: "non-fungible",
        supplyLimit: 1000
    };

    try {
        const response = await axios.post(`${API_BASE_URL}/2022-06-09/collections/`, requestBody, {
            headers: {
                'X-API-KEY': API_KEY
            }
        });
        return response.data;
    } catch (error) {
        console.error('Failed to create NFT collection:', error);
        throw error;
    }
}

async function mintNFT(collectionId: string) {
    const requestBody = {
        recipient: "email:test@example.com:polygon",
        metadata: {
            name: "Crossmint Example NFT",
            image: "https://www.crossmint.com/assets/crossmint/logo.png",
            description: "My NFT created via the mint API!"
        }
    };

    try {
        const response = await axios.post(`${API_BASE_URL}/2022-06-09/collections/${collectionId}/nfts`, requestBody, {
            headers: {
                'X-API-KEY': API_KEY
            }
        });
        return response.data;
    } catch (error) {
        console.error('Failed to mint NFT:', error);
        throw error;
    }
}

async function checkMintingStatus(actionId: string) {
    try {
        const response = await axios.get(`${API_BASE_URL}/2022-06-09/actions/${actionId}`, {
            headers: {
                'X-API-KEY': API_KEY
            }
        });
        return response.data;
    } catch (error) {
        console.error('Failed to check minting status:', error);
        throw error;
    }
}

async function main() {
    try {
        console.log('Creating NFT collection...');
        const collection = await createNFTCollection();
        console.log('Collection created:', collection);

        console.log('Minting NFT...');
        const minted = await mintNFT(collection.id);
        console.log('NFT minted:', minted);

        console.log('Checking minting status...');
        const status = await checkMintingStatus(minted.actionId);
        console.log('Minting status:', status);
    } catch (error) {
        console.error('Error during NFT creation and minting process:', error);
    }
}

main();
