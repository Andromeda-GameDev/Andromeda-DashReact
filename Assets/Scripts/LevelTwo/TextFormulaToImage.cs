using System.Collections;
using UnityEngine;
using UnityEngine.Networking;
using UnityEngine.UI;

public class TextFormulaToImage : MonoBehaviour
{
    public Image uiImage; // Use Image instead of RawImage
    public string textFormula = "f(x)=2*(1/2)";

    void Start()
    {
        StartCoroutine(MakeRequest());
    }

    private IEnumerator MakeRequest()
    {
        UnityWebRequest webRequest = UnityWebRequestTexture.GetTexture("https://latex.codecogs.com/png?" + textFormula);
        yield return webRequest.SendWebRequest();

        if (webRequest.result == UnityWebRequest.Result.Success)
        {
            Texture2D texture = DownloadHandlerTexture.GetContent(webRequest);
            texture.filterMode = FilterMode.Bilinear;
            texture.wrapMode = TextureWrapMode.Clamp;

            // Convert the Texture2D to a Sprite
            Sprite sprite = Sprite.Create(texture, new Rect(0, 0, texture.width, texture.height), Vector2.one * 0.5f);

            // Assign the Sprite to the Image component
            uiImage.sprite = sprite;
        }
        else
        {
            Debug.Log("Request error: " + webRequest.error);
        }
    }
}