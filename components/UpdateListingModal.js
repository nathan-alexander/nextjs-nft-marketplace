import { Modal, Input, useNotification } from "web3uikit"
import { useState } from "react"
import { useWeb3Contract } from "react-moralis"
import nftMarketplaceAbi from "../constants/NftMarketplace.json"
import nftAbi from "../constants/BasicNft.json"
import { ethers } from "ethers"

export default function UpdateListingModal({
    nftAddress,
    tokenId,
    isVisible,
    marketplaceAddress,
    onClose,
}) {
    const [priceToUpdateListingWith, setPricetoUpdateListingWith] = useState(0)

    const dispatch = useNotification()

    const { runContractFunction: updateListing } = useWeb3Contract({
        abi: nftMarketplaceAbi,
        contractAddress: marketplaceAddress,
        functionName: "updateListing",
        params: {
            nftAddress: nftAddress,
            tokenId: tokenId,
            newPrice: ethers.utils.parseEther(priceToUpdateListingWith || "0"),
        },
    })

    const handleUpdateListingSuccess = async (tx) => {
        await tx.wait(1)
        dispatch({
            type: "success",
            message: "listing updated",
            title: "Listing updated - please refresh (and move blocks",
            position: "topR",
        })
        onClose && onClose()
        setPricetoUpdateListingWith("0")
    }

    {
        return (
            <Modal
                isVisible={isVisible}
                onCancel={onClose}
                onCloseButtonPressed={onClose}
                onOk={() => {
                    updateListing({
                        onError: (error) => {
                            console.log(error)
                        },
                        onSuccess: handleUpdateListingSuccess,
                    })
                }}
            >
                <Input
                    label="Update listing price in L1 Currency (ETH)"
                    name="New Listing Price"
                    type="number"
                    onChange={(event) => {
                        setPricetoUpdateListingWith(event.target.value)
                    }}
                />
            </Modal>
        )
    }
}
